import crypto from 'crypto';

export function generateSignature(
  partnerKey: string,
  parts: string[]
): string {
  const baseString = parts.join('');
  return crypto
    .createHmac('sha256', partnerKey)
    .update(baseString)
    .digest('hex');
} 