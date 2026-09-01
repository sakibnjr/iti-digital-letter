'use client';

import WaxSeal from '@/app/_components/WaxSeal';
import { SparkleIcon } from '@/app/_components/ArtisticAnnotations';

interface RevealStageProps {
  lang: 'bn' | 'en';
}

export default function RevealStage({ lang }: RevealStageProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Envelope with Floating Sparkles */}
      <div className="relative w-64 sm:w-76 aspect-[1.6/1] bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl shadow-xl flex items-center justify-center border border-sky-400/30 p-4">
        {/* Floating animated sparkles */}
        <span className="absolute -top-3 -left-3 animate-sparkle-float-1">
          <SparkleIcon size={20} color="#38BDF8" />
        </span>
        <span className="absolute -top-3 -right-3 animate-sparkle-float-2">
          <SparkleIcon size={24} color="#93C5FD" />
        </span>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 animate-sparkle-float-3">
          <SparkleIcon size={18} color="#38BDF8" />
        </span>

        {/* Gold Seal on Envelope */}
        <WaxSeal design="iti" color="gold" size="lg" />
      </div>

      <p className="mt-6 text-sm font-serif text-slate-700/85 font-medium tracking-wide">
        {lang === 'bn'
          ? 'প্রাপক সিলমোহর ভেঙে ব্যক্তিগতভাবে চিঠিটি খুলবেন'
          : 'Delivered securely — unsealed by the recipient'}
      </p>
    </div>
  );
}
