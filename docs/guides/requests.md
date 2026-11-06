# Requests: Timeouts, Retries, Errors and Pagination

All options below are opt-in. Without them the SDK behaves exactly as before: no timeout, no automatic retries.

## Timeouts and cancellation

```typescript
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-partner-key',
  timeout_ms: 15_000, // abort requests that take longer than 15s
});

// Every manager method accepts per-call options as its last argument.
const controller = new AbortController();
const orders = await sdk.order.getOrderList(params, {
  signal: controller.signal, // cancel from your side
  timeout_ms: 30_000,        // override the SDK timeout (0 disables it)
});
```

A timeout rejects with `ShopeeTimeoutError`. An abort through `signal` rejects with the signal's reason, as `fetch` does.

## Automatic retries

```typescript
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-partner-key',
  retry: { retries: 3 },
});

// Disable retries for one call
await sdk.product.updateStock(params, { retry: false });
```

| Option | Default | Description |
|---|---|---|
| `retries` | `2` | Retries after the first attempt |
| `min_delay_ms` | `500` | Base delay for exponential backoff with jitter |
| `max_delay_ms` | `10000` | Upper bound for one delay, including `Retry-After` |
| `error_codes` | `["error_rate_limit", "error_system_busy"]` | Shopee error codes to retry |
| `http_statuses` | `[429, 502, 503, 504]` | HTTP statuses to retry |
| `retry_non_idempotent` | `false` | Also retry POST requests on failures that may have been processed |

What is retried:

- **Rate limits** (HTTP 429 or `error_rate_limit`) for every method, because Shopee rejected the call before processing it.
- **Network errors, timeouts, 5xx responses and the other listed error codes** only for GET requests, unless `retry_non_idempotent` is `true`. A POST that failed this way may already have been applied (for example a stock update), so retrying it could apply it twice.
- Client errors such as `error_param` are never retried.

Each retry is signed again with the current access token. A `Retry-After` header is honoured, capped by `max_delay_ms`.

## Errors

| Class | Extends | When |
|---|---|---|
| `ShopeeApiError` | `Error` | Shopee returned a JSON payload with `error`. Fields: `status`, `error`, `apiMessage`, `requestId`, `data` |
| `ShopeeSdkError` | `Error` | Base class for errors raised by the SDK itself |
| `ShopeeNetworkError` | `ShopeeSdkError` | The request could not be completed |
| `ShopeeTimeoutError` | `ShopeeNetworkError` | The request exceeded `timeout_ms` |
| `ShopeeHttpError` | `ShopeeSdkError` | A response the SDK cannot parse, such as an HTML 502 page. Fields: `status`, `contentType`, `body` |

All SDK errors keep the underlying error in `cause`.

```typescript
import { ShopeeApiError, ShopeeNetworkError } from '@congminh1254/shopee-sdk';

try {
  await sdk.product.getItemBaseInfo({ item_id_list: [1] });
} catch (error) {
  if (error instanceof ShopeeApiError && error.error === 'error_item_not_found') {
    // handle a missing item
  } else if (error instanceof ShopeeNetworkError) {
    // network problem or timeout
  }
}
```

## Hooks

Hooks let you log requests or record metrics. They run for every attempt; errors thrown by a hook are ignored. `access_token` and `sign` are redacted from `url`.

```typescript
const sdk = new ShopeeSDK({
  partner_id: 123456,
  partner_key: 'your-partner-key',
  hooks: {
    onRequest: ({ method, path, attempt }) => logger.debug({ method, path, attempt }),
    onResponse: ({ path, status, duration_ms, request_id }) =>
      metrics.timing('shopee.request', duration_ms, { path, status }),
    onError: ({ path, error, will_retry }) => logger.warn({ path, error, will_retry }),
  },
});
```

## Pagination

`paginate` yields every item across pages; `paginatePages` yields whole responses. Pick the helper that matches the endpoint:

| Helper | Request field | Response fields | Example endpoint |
|---|---|---|---|
| `nextByCursor()` | `cursor` | `more`, `next_cursor` | `order.getOrderList` |
| `nextByOffset()` | `offset` | `has_next_page`, `next_offset` | `product.getItemList` |
| `nextByPageNo()` | `page_no` | `more` | `returns.getReturnList` |

```typescript
import { paginate, nextByCursor, nextByOffset } from '@congminh1254/shopee-sdk';

for await (const order of paginate(
  (params) => sdk.order.getOrderList(params),
  { time_range_field: 'create_time', time_from, time_to, page_size: 100 },
  { items: (res) => res.response?.order_list, next: nextByCursor() }
)) {
  console.log(order.order_sn);
}

const items = paginate(
  (params) => sdk.product.getItemList(params),
  { offset: 0, page_size: 100, item_status: 'NORMAL' },
  { items: (res) => res.response?.item, next: nextByOffset(), max_pages: 50 }
);
```

Each helper takes custom field names, e.g. `nextByCursor({ param: 'cursor', nextCursor: 'next_cursor', more: 'more' })`, and stops when the cursor or offset stops advancing.

## File uploads

Upload fields accept a `Buffer`, a `Blob`/`File`, or an `UploadFile` object when you need to set the filename or content type:

```typescript
await sdk.logistics.uploadServiceablePolygon({
  file: { data: kmlBuffer, filename: 'area.kml', contentType: 'application/vnd.google-earth.kml+xml' },
});
```

A bare `Buffer` is named from its content: PNG, JPEG, GIF, WebP, PDF, MP4 and MOV are recognised; anything else is sent as `application/octet-stream`.

## Schema namespaces

Some schema modules reuse type names (`Item`, `Model`, ...), so they are not flattened into `@congminh1254/shopee-sdk/schemas`. They are available as namespaces:

```typescript
import { Discount, Logistics } from '@congminh1254/shopee-sdk/schemas';

type AddDiscount = Discount.AddDiscountRequest;
type Channel = Logistics.GetChannelListResponse;
```
