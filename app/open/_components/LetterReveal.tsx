'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { LetterData } from '@/app/_lib/types';
import { recordReceivedLetter } from '@/app/_lib/storage';
import { notifyStorageUpdated } from '@/app/_lib/hooks';
import { Calendar, MapPin } from 'lucide-react';
import LetterActions from './LetterActions';

interface LetterRevealProps {
  letter: LetterData;
  lang: 'bn' | 'en';
}

export default function LetterReveal({ letter, lang }: LetterRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Record to keepsake box on reveal
  useEffect(() => {
    recordReceivedLetter(letter);
    notifyStorageUpdated();
  }, [letter]);


  useGSAP(() => {
    gsap.from(ref.current, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' });
    gsap.from('[data-letter-body]', { y: 20, opacity: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' });
    gsap.from('[data-letter-sign]', { y: 15, opacity: 0, duration: 0.4, delay: 0.5, ease: 'power2.out' });
  }, { scope: ref });

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto px-4 py-8">
      {/* Parchment */}
      <div className="relative rounded-2xl p-6 sm:p-12 shadow-xl bg-[#FAF6EE] text-[#2C1810] deckle-edge paper-grain" style={{ fontFamily: 'var(--font-bn-serif)' }}>
        <div className="iti-watermark">ইতি</div>

        {/* Date & Place */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs text-amber-950/70 mb-8 font-serif">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-60" />
            <span>{letter.dateStr}</span>
          </div>
          {letter.placeStr && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 opacity-60" />
              <span>{letter.placeStr}</span>
            </div>
          )}
        </div>

        {/* Salutation */}
        <div className="text-lg sm:text-xl font-bold font-serif mb-6">{letter.salutation} {letter.recipientName},</div>

        {/* Body */}
        <div data-letter-body className="text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-wrap" style={{ lineHeight: '2.0' }}>
          {letter.body}
        </div>

        {/* Sign-off */}
        <div data-letter-sign className="flex flex-col items-end text-right mt-8 pt-4 border-t border-amber-900/15 font-serif">
          <div className="text-base sm:text-lg font-semibold text-amber-950/90">{letter.signOff}</div>
          <div className="text-lg sm:text-xl font-bold text-amber-950 mt-1">{letter.senderName}</div>
        </div>

        {/* P.S. */}
        {letter.postScript && (
          <div className="mt-8 pt-4 border-t border-amber-900/15 text-xs text-amber-900/80 font-serif">
            <span className="font-bold">{lang === 'bn' ? 'পুনশ্চ: ' : 'P.S. '}</span>{letter.postScript}
          </div>
        )}
      </div>

      <LetterActions letter={letter} lang={lang} />
    </div>
  );
}
