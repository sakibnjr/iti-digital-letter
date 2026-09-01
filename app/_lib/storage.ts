import type { LetterData, SavedLetterItem } from './types';

const KEY_SAVED = 'iti_saved_letters_v1';
const KEY_DRAFT = 'iti_draft_letter_v1';
const KEY_LANG = 'iti_lang_pref_v1';

// ── Language ───────────────────────────────────────────

export function getStoredLang(): 'bn' | 'en' {
  if (typeof window === 'undefined') return 'bn';
  try {
    const saved = localStorage.getItem(KEY_LANG);
    return saved === 'en' ? 'en' : 'bn';
  } catch {
    return 'bn';
  }
}

export function setStoredLang(lang: 'bn' | 'en'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_LANG, lang);
  } catch {}
}


// ── Draft ──────────────────────────────────────────────

export function saveDraft(letter: Partial<LetterData>): void {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(KEY_DRAFT, JSON.stringify(letter)); } catch {}
}

export function getDraft(): Partial<LetterData> | null {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(localStorage.getItem(KEY_DRAFT) || 'null'); } catch { return null; }
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(KEY_DRAFT); } catch {}
}

// ── Keepsake Box ───────────────────────────────────────

export function getKeepsakeLetters(): SavedLetterItem[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY_SAVED) || '[]'); } catch { return []; }
}

export function recordSentLetter(letter: LetterData): void {
  save(letter, 'sent');
}

export function recordReceivedLetter(letter: LetterData): void {
  save(letter, 'received');
}

export function removeKeepsakeLetter(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const filtered = getKeepsakeLetters().filter((i) => i.letter.id !== id);
    localStorage.setItem(KEY_SAVED, JSON.stringify(filtered));
  } catch {}
}

function save(letter: LetterData, type: 'sent' | 'received') {
  if (typeof window === 'undefined') return;
  try {
    const existing = getKeepsakeLetters();
    if (existing.some((i) => i.letter.id === letter.id)) return;
    existing.unshift({ letter, type, savedAt: Date.now() });
    localStorage.setItem(KEY_SAVED, JSON.stringify(existing.slice(0, 50)));
  } catch {}
}
