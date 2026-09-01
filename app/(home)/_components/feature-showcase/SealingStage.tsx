'use client';

import WaxSeal from '@/app/_components/WaxSeal';

interface SealingStageProps {
  lang: 'bn' | 'en';
}

export default function SealingStage({ lang }: SealingStageProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Wax Seal Visual with Pulse & Splatter */}
      <div className="relative flex items-center justify-center p-6">
        {/* Expanding melted wax ripples */}
        <div className="absolute w-28 h-28 rounded-full bg-rose-900/10 animate-ping pointer-events-none" />
        <div className="absolute w-24 h-24 rounded-full bg-amber-800/15 animate-warm-pulse pointer-events-none" />

        {/* 3D Wax Seal */}
        <div className="relative z-10 hover:scale-105 transition-transform">
          <WaxSeal design="iti" color="crimson" size="xl" />
        </div>
      </div>

      <p className="mt-6 text-sm font-serif text-amber-900/80 font-medium tracking-wide">
        {lang === 'bn'
          ? 'গরম গালা ও রাজকীয় সিলমোহরে আবদ্ধ'
          : 'Sealed forever in hot wax & royal emblem'}
      </p>
    </div>
  );
}
