'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import type { LetterData } from '@/app/_lib/types';
import EnvelopeVisual from '@/app/_components/EnvelopeVisual';
import WaxSeal from '@/app/_components/WaxSeal';
import { Sparkles } from 'lucide-react';

interface SealedEnvelopeProps {
  letter: LetterData;
  lang: 'bn' | 'en';
  onOpened: () => void;
}

export default function SealedEnvelope({ letter, lang, onOpened }: SealedEnvelopeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sealContainerRef = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(false);

  // Entrance animation
  useGSAP(() => {
    gsap.from(containerRef.current, { y: 35, opacity: 0, duration: 0.6, ease: 'power3.out' });
  }, { scope: containerRef });

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);

    // Fire golden & sapphire confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#2563EB', '#38BDF8', '#F59E0B', '#FDE68A', '#FEF3C7'],
      });
    } catch {}

    const tl = gsap.timeline({
      onComplete: () => {
        onOpened();
      },
    });

    // 1. Wax seal crack & burst
    tl.to('[data-seal-target]', {
      scale: 1.2,
      rotate: 15,
      opacity: 0,
      duration: 0.4,
      ease: 'back.in(1.7)',
    })
    // 2. Envelope unfolds/fades smoothly
    .to(containerRef.current, {
      y: -20,
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: 'power2.in',
    }, '-=0.15');
  };

  return (
    <div ref={containerRef} className="w-full max-w-lg px-4 py-8 sm:py-12 flex flex-col items-center text-center">
      {/* Title & Badge */}
      <div className="mb-6 sm:mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-serif font-medium text-slate-700 bg-blue-900/10 border border-blue-900/15 mb-2.5 shadow-2xs">
          <Sparkles className="w-3 h-3 text-blue-700" />
          {lang === 'bn' ? 'আপনার জন্য একটি চিঠি' : 'A sealed letter for you'}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {letter.salutation} <span className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-950 bg-clip-text text-transparent">{letter.recipientName}</span>
        </h1>
      </div>

      {/* Interactive Envelope with Seal */}
      <div
        onClick={handleOpen}
        className="w-full relative cursor-pointer group transition-all duration-300 hover:scale-[1.015] active:scale-[0.985]"
      >
        <EnvelopeVisual
          envelopeColor={letter.envelopeColor || '#0F172A'}
          senderName={letter.senderName}
          recipientName={letter.recipientName}
          salutation={letter.salutation}
          placeStr={letter.placeStr}
          lang={lang}
        >
          <div ref={sealContainerRef} data-seal-target className="transition-transform">
            <WaxSeal
              design={letter.waxSealDesign}
              color={letter.waxSealColor}
              size="lg"
              interactive={false}
              className={opening ? '' : 'animate-warm-pulse group-hover:scale-108 transition-transform'}
            />
          </div>
        </EnvelopeVisual>
      </div>

      {/* Tap hint button */}
      <button
        type="button"
        onClick={handleOpen}
        disabled={opening}
        className="mt-6 sm:mt-8 flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-serif font-bold text-slate-900 bg-white/80 hover:bg-white border border-blue-900/20 hover:border-blue-900/35 transition-all cursor-pointer shadow-xs hover:shadow-sm disabled:opacity-50"
      >
        <Sparkles className="w-3.5 h-3.5 text-blue-700 animate-pulse" />
        <span>{opening ? (lang === 'bn' ? 'চিঠি খোলা হচ্ছে...' : 'Opening letter...') : (lang === 'bn' ? 'সিলমোহরে চাপ দিয়ে চিঠিটি খুলুন' : 'Tap to break seal & open')}</span>
      </button>
    </div>
  );
}
