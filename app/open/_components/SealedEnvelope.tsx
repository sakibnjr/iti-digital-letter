'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { LetterData } from '@/app/_lib/types';
import EnvelopeVisual from '@/app/_components/EnvelopeVisual';
import WaxSeal from '@/app/_components/WaxSeal';
import EnvelopeAnimation from './EnvelopeAnimation';

interface SealedEnvelopeProps {
  letter: LetterData;
  lang: 'bn' | 'en';
  onOpened: () => void;
}

export default function SealedEnvelope({ letter, lang, onOpened }: SealedEnvelopeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [cracking, setCracking] = useState(false);

  useGSAP(() => {
    gsap.from(ref.current, { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' });
  }, { scope: ref });

  const handleTap = () => {
    if (cracking) return;
    setCracking(true);
  };

  return (
    <div ref={ref} className="w-full max-w-lg px-4 py-12 flex flex-col items-center text-center">
      {cracking && <EnvelopeAnimation onComplete={onOpened} />}

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-amber-950 mb-8">
        {letter.salutation} {letter.recipientName}
      </h1>

      <div className="w-full relative">
        <EnvelopeVisual
          envelopeColor={letter.envelopeColor || '#7F1D1D'}
          senderName={letter.senderName}
          recipientName={letter.recipientName}
          salutation={letter.salutation}
          placeStr={letter.placeStr}
          lang={lang}
        >
          <WaxSeal
            design={letter.waxSealDesign}
            color={letter.waxSealColor}
            size="lg"
            interactive={!cracking}
            onClick={handleTap}
            className={cracking ? 'animate-wax-break' : 'animate-warm-pulse'}
          />
        </EnvelopeVisual>
      </div>

      {!cracking && (
        <span className="mt-4 text-xs font-serif font-bold text-amber-950/70 bg-amber-900/5 px-3 py-1 rounded-full border border-amber-900/10">
          {lang === 'bn' ? 'সিলমোহরে চাপ দিন' : 'Tap the seal to open'}
        </span>
      )}
    </div>
  );
}
