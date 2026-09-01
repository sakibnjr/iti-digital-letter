import type { WaxColorConfig, WaxDesignConfig } from './types';

export const WAX_COLORS: WaxColorConfig[] = [
  { id: 'crimson', nameBn: 'লাল', nameEn: 'Crimson', hex: '#881337', highlight: '#BE123C', shadow: '#4C0519', accent: '#FFE4E6' },
  { id: 'gold', nameBn: 'সোনালী', nameEn: 'Gold', hex: '#B45309', highlight: '#F59E0B', shadow: '#78350F', accent: '#FEF3C7' },
  { id: 'terracotta', nameBn: 'পোড়ামাটি', nameEn: 'Terracotta', hex: '#9A3412', highlight: '#EA580C', shadow: '#431407', accent: '#FFEDD5' },
  { id: 'emerald', nameBn: 'সবুজ', nameEn: 'Emerald', hex: '#064E3B', highlight: '#059669', shadow: '#022C22', accent: '#D1FAE5' },
  { id: 'midnight', nameBn: 'নীল', nameEn: 'Midnight', hex: '#1E3A8A', highlight: '#3B82F6', shadow: '#0F172A', accent: '#DBEAFE' },
  { id: 'blush', nameBn: 'গোলাপি', nameEn: 'Blush', hex: '#9F1239', highlight: '#FB7185', shadow: '#4C0519', accent: '#FFE4E6' },
  { id: 'obsidian', nameBn: 'কালো', nameEn: 'Obsidian', hex: '#18181B', highlight: '#3F3F46', shadow: '#09090B', accent: '#E4E4E7' },
];

export const WAX_DESIGNS: WaxDesignConfig[] = [
  { id: 'iti', nameBn: 'ইতি', nameEn: '"ইতি"', symbol: 'ইতি' },
  { id: 'lotus', nameBn: 'পদ্ম', nameEn: 'Lotus', symbol: '🪷' },
  { id: 'heart', nameBn: 'হৃদয়', nameEn: 'Heart', symbol: '♥' },
  { id: 'feather', nameBn: 'পালক', nameEn: 'Feather', symbol: '🪶' },
  { id: 'moon', nameBn: 'চাঁদ', nameEn: 'Moon', symbol: '🌙' },
  { id: 'rose', nameBn: 'গোলাপ', nameEn: 'Rose', symbol: '🌹' },
  { id: 'tree', nameBn: 'বৃক্ষ', nameEn: 'Tree', symbol: '🌳' },
];

export const SALUTATIONS_BN = [
  'প্রিয়', 'সুপ্রিয়', 'প্রিয়তম', 'স্নেহের',
  'শ্রদ্ধাস্পদেষু', 'পরম শ্রদ্ধেয়', 'বহুদিন পর তোমাকে...',
];

export const SALUTATIONS_EN = [
  'Dearest', 'My Dear', 'To my beloved', 'Darling',
  'To a cherished friend', 'Respected', 'Thinking of you,',
];

export const SIGN_OFFS_BN = [
  'ইতি, তোমারই', 'ইতি, তোমার চিরদিনের', 'ইতি, ভালোবাসায় মোড়ানো',
  'ইতি, সুদূর থেকে', 'ইতি, পরম ভক্ত', 'ইতি, স্নেহের', 'ইতি...',
];

export const SIGN_OFFS_EN = [
  'Yours always,', 'With all my love,', 'Yours faithfully,',
  'Forever yours,', 'Until we meet again,', 'Warmly,',
];

export const ENVELOPE_COLORS = [
  { id: '#7F1D1D', nameBn: 'লাল', nameEn: 'Carmine' },
  { id: '#0F172A', nameBn: 'নীল', nameEn: 'Midnight' },
  { id: '#78350F', nameBn: 'বাদামী', nameEn: 'Kraft' },
  { id: '#064E3B', nameBn: 'সবুজ', nameEn: 'Forest' },
  { id: '#831843', nameBn: 'গোলাপি', nameEn: 'Plum' },
  { id: '#1E293B', nameBn: 'স্লেট', nameEn: 'Slate' },
];
