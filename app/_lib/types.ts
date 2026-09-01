export type WaxSealDesignId = 'iti' | 'lotus' | 'heart' | 'feather' | 'moon' | 'rose' | 'tree';

export type WaxColorId = 'crimson' | 'gold' | 'midnight' | 'emerald' | 'terracotta' | 'blush' | 'obsidian';

export interface LetterData {
  id: string;
  createdAt: number;
  recipientName: string;
  salutation: string;
  dateStr: string;
  placeStr?: string;
  body: string;
  signOff: string;
  senderName: string;
  postScript?: string;
  waxSealDesign?: WaxSealDesignId;
  waxSealColor?: WaxColorId;
  envelopeColor?: string;
  language?: 'bn' | 'en';
}

export interface WaxColorConfig {
  id: WaxColorId;
  nameBn: string;
  nameEn: string;
  hex: string;
  highlight: string;
  shadow: string;
  accent: string;
}

export interface WaxDesignConfig {
  id: WaxSealDesignId;
  nameBn: string;
  nameEn: string;
  symbol: string;
}

export interface SavedLetterItem {
  letter: LetterData;
  type: 'sent' | 'received';
  savedAt: number;
}
