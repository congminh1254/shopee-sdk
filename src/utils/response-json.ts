/** Keep unquoted integer tokens outside the safe JS range as exact decimal strings. */
export function parseResponseJson(text: string): unknown {
  // Validate the original grammar before transforming tokens (including leading zero rules).
  const parsed: unknown = JSON.parse(text);
  let changed = false;
  const safe = text.replace(/"(?:[^"\\]|\\.)*"|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, (token) => {
    if (token.startsWith('"')) return token;
    if (/[.eE]/.test(token)) {
      const number = Number(token);
      if (!Number.isFinite(number) || (Number.isInteger(number) && !Number.isSafeInteger(number))) {
        throw new Error(
          "Unsafe numeric response literal; large integers must use decimal integer notation or quoted strings"
        );
      }
      return token;
    }
    const value = BigInt(token);
    if (value > BigInt(Number.MAX_SAFE_INTEGER) || value < BigInt(Number.MIN_SAFE_INTEGER)) {
      changed = true;
      return JSON.stringify(token);
    }
    return token;
  });
  return changed ? JSON.parse(safe) : parsed;
}
