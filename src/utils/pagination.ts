/**
 * Helpers for walking paginated Shopee endpoints.
 *
 * Shopee uses three pagination styles:
 * - cursor: request `cursor`, response `more` + `next_cursor` (e.g. `order.getOrderList`)
 * - offset: request `offset`, response `has_next_page` + `next_offset` (e.g. `product.getItemList`)
 * - page number: request `page_no`, response `more` (e.g. `returns.getReturnList`)
 *
 * @example
 * ```ts
 * for await (const order of paginate(
 *   (params) => sdk.order.getOrderList(params),
 *   { time_range_field: "create_time", time_from, time_to, page_size: 100 },
 *   { items: (res) => res.response?.order_list, next: nextByCursor() }
 * )) {
 *   console.log(order.order_sn);
 * }
 * ```
 */

/** Computes the params of the next page, or `undefined` when there are no more pages. */
export type NextPage<P, R> = (response: R, params: P) => P | undefined;

export interface PaginateOptions<P, R, I> {
  /** Extracts the items of one page. */
  items: (response: R) => readonly I[] | null | undefined;
  /** Computes the params of the next page; see `nextByCursor`, `nextByOffset`, `nextByPageNo`. */
  next: NextPage<P, R>;
  /** Stop after this many pages, as a safety net. Default: unlimited. */
  max_pages?: number;
}

function responseBody(response: unknown): Record<string, unknown> | undefined {
  if (response && typeof response === "object" && "response" in response) {
    const body = (response as { response?: unknown }).response;
    if (body && typeof body === "object") return body as Record<string, unknown>;
  }
  return undefined;
}

/** Yields every page response, following `next` until it returns `undefined`. */
export async function* paginatePages<P, R>(
  fetchPage: (params: P) => Promise<R>,
  params: P,
  options: Pick<PaginateOptions<P, R, unknown>, "next" | "max_pages">
): AsyncGenerator<R, void, undefined> {
  let current: P | undefined = params;
  let pages = 0;
  while (current !== undefined) {
    if (options.max_pages !== undefined && pages >= options.max_pages) return;
    const response = await fetchPage(current);
    pages += 1;
    yield response;
    current = options.next(response, current);
  }
}

/** Yields every item across all pages. */
export async function* paginate<P, R, I>(
  fetchPage: (params: P) => Promise<R>,
  params: P,
  options: PaginateOptions<P, R, I>
): AsyncGenerator<I, void, undefined> {
  for await (const page of paginatePages(fetchPage, params, options)) {
    const items = options.items(page);
    if (items) yield* items;
  }
}

/** Cursor pagination: `more` + `next_cursor` in the response, `cursor` in the request. */
export function nextByCursor<P, R>(
  fields: { param?: string; nextCursor?: string; more?: string } = {}
): NextPage<P, R> {
  const { param = "cursor", nextCursor = "next_cursor", more = "more" } = fields;
  return (response, params) => {
    const body = responseBody(response);
    const cursor = body?.[nextCursor];
    const current = (params as Record<string, unknown>)[param];
    if (!body?.[more] || typeof cursor !== "string" || cursor === "" || cursor === current) {
      return undefined;
    }
    return { ...params, [param]: cursor };
  };
}

/** Offset pagination: `has_next_page` + `next_offset` in the response, `offset` in the request. */
export function nextByOffset<P, R>(
  fields: { param?: string; nextOffset?: string; hasNext?: string } = {}
): NextPage<P, R> {
  const { param = "offset", nextOffset = "next_offset", hasNext = "has_next_page" } = fields;
  return (response, params) => {
    const body = responseBody(response);
    const offset = body?.[nextOffset];
    const current = (params as Record<string, unknown>)[param] ?? 0;
    if (!body?.[hasNext] || typeof offset !== "number" || offset <= (current as number)) {
      return undefined;
    }
    return { ...params, [param]: offset };
  };
}

/** Page-number pagination: `more` in the response, `page_no` (1-based) in the request. */
export function nextByPageNo<P, R>(fields: { param?: string; more?: string } = {}): NextPage<P, R> {
  const { param = "page_no", more = "more" } = fields;
  return (response, params) => {
    const body = responseBody(response);
    if (!body?.[more]) return undefined;
    const current = Number((params as Record<string, unknown>)[param] ?? 1);
    return { ...params, [param]: current + 1 };
  };
}
