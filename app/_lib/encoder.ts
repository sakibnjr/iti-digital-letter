import LZString from 'lz-string';
import type { LetterData } from './types';

/** Compresses a LetterData object into a URL-safe string. */
export function encodeLetter(letter: LetterData): string {
  try {
    return LZString.compressToEncodedURIComponent(JSON.stringify(letter));
  } catch {
    const utf8 = new TextEncoder().encode(JSON.stringify(letter));
    return btoa(String.fromCharCode(...utf8));
  }
}

/** Decodes a compressed string back into LetterData. */
export function decodeLetter(encoded: string): LetterData | null {
  if (!encoded) return null;

  // Try lz-string first
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (json) {
      const parsed = JSON.parse(json);
      if (isValidLetter(parsed)) return parsed;
    }
  } catch { /* fall through */ }

  // Try raw URI decoding
  try {
    const parsed = JSON.parse(decodeURIComponent(encoded));
    if (isValidLetter(parsed)) return parsed;
  } catch { /* fall through */ }

  // Try base64 fallback
  try {
    const bin = atob(encoded);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    if (isValidLetter(parsed)) return parsed;
  } catch { /* exhausted */ }

  return null;
}

function isValidLetter(data: unknown): data is LetterData {
  if (!data || typeof data !== 'object') return false;
  const d = data as Partial<LetterData>;
  return typeof d.body === 'string' && typeof d.recipientName === 'string' && typeof d.senderName === 'string';
}

/** Builds the full shareable URL. Points to /open route. */
export function generateShareUrl(letter: LetterData, baseUrl?: string): string {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  if (letter.id) {
    return `${origin}/open?id=${encodeURIComponent(letter.id)}`;
  }
  const encoded = encodeLetter(letter);
  return `${origin}/open#letter=${encoded}`;
}

/** Saves letter to MongoDB API endpoint */
export async function saveLetterToApi(letter: LetterData): Promise<LetterData> {
  const res = await fetch('/api/letters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(letter),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to save letter' }));
    throw new Error(err.error || 'Failed to save letter');
  }

  const data = await res.json();
  return data.letter;
}

/** Fetches letter by ID from MongoDB API endpoint */
export async function fetchLetterFromApi(id: string): Promise<LetterData | null> {
  try {
    const res = await fetch(`/api/letters/${encodeURIComponent(id)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.letter || null;
  } catch {
    return null;
  }
}

