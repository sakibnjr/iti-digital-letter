'use client';

import type { LetterData } from '@/app/_lib/types';
import { Reply, Feather } from 'lucide-react';
import Link from 'next/link';

interface LetterActionsProps {
  letter: LetterData;
  lang: 'bn' | 'en';
}

export default function LetterActions({ letter, lang }: LetterActionsProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Link
        href={`/write?replyTo=${encodeURIComponent(letter.senderName)}`}
        className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-amber-800 via-rose-900 to-amber-900 text-amber-100 font-serif font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400/20"
      >
        <Reply className="w-4 h-4 text-amber-200" />
        {lang === 'bn' ? `উত্তর দিন (${letter.senderName})` : `Reply to ${letter.senderName}`}
      </Link>

      <Link
        href="/write"
        className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-900/10 hover:bg-amber-900/20 border border-amber-900/20 text-amber-950 font-serif font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
      >
        <Feather className="w-4 h-4 text-amber-800" />
        {lang === 'bn' ? 'নতুন চিঠি' : 'New Letter'}
      </Link>
    </div>
  );
}
