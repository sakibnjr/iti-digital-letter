'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface SealAnimationProps {
  onComplete: () => void;
}

export default function SealAnimation({ onComplete }: SealAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ onComplete });

    tl.from('[data-wax-drop]', { scale: 0, opacity: 0, duration: 0.4, ease: 'back.out(2)' })
      .to('[data-wax-drop]', { scale: 1.1, duration: 0.15, ease: 'power2.in' })
      .to('[data-wax-drop]', { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' })
      .from('[data-stamp-text]', { scale: 0, rotation: -20, opacity: 0, duration: 0.3, ease: 'back.out(3)' }, '-=0.1')
      .to('[data-seal-glow]', { opacity: 0.6, duration: 0.3 })
      .to('[data-seal-glow]', { opacity: 0, duration: 0.5 });
  }, { scope: ref });

  return (
    <div ref={ref} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative">
        {/* Wax drop */}
        <div data-wax-drop className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-800 to-rose-950 shadow-2xl flex items-center justify-center">
          <span data-stamp-text className="font-serif text-2xl font-extrabold text-amber-100">ইতি</span>
        </div>
        {/* Glow burst */}
        <div data-seal-glow className="absolute inset-0 w-24 h-24 rounded-full bg-amber-400/0 blur-xl" />
      </div>
    </div>
  );
}
