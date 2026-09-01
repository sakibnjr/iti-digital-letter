'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

interface EnvelopeAnimationProps {
  onComplete: () => void;
}

export default function EnvelopeAnimation({ onComplete }: EnvelopeAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fire confetti
    try {
      confetti({ particleCount: 45, spread: 70, origin: { y: 0.55 }, colors: ['#BE123C', '#C5A059', '#F59E0B', '#FAF6EE'] });
    } catch {}

    const tl = gsap.timeline({ onComplete });

    // Envelope flap lifts
    tl.to('[data-flap]', { rotateX: 180, opacity: 0.4, duration: 0.6, ease: 'power2.inOut' })
      // Letter slides out
      .from('[data-letter-slide]', { y: 100, opacity: 0, scale: 0.9, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      // Fade out overlay
      .to(ref.current, { opacity: 0, duration: 0.3, delay: 0.3 });
  }, { scope: ref });

  return (
    <div ref={ref} className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-64 h-40">
        {/* Flap */}
        <div data-flap className="absolute top-0 left-0 right-0 h-1/2 bg-amber-900/30 rounded-t-xl" style={{ transformOrigin: 'top center', perspective: '800px' }} />
        {/* Sliding letter */}
        <div data-letter-slide className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-32 bg-[#FAF6EE] rounded-xl shadow-lg border border-amber-900/20 flex items-center justify-center font-serif text-amber-950 text-sm">
            ✉️
          </div>
        </div>
      </div>
    </div>
  );
}
